import { Request, Response } from 'express';
import { Thought, User } from '../models';

const thoughtController = {
    // get all thoughts
    getAllThoughts(req: Request, res: Response): void {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get one thought by its id
    createThought(req: Request, res: Response): void {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userID },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    // update thought by its id
    updateThought(req: Request, res: Response): void {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought by ID' });
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // getThoughtById
    getThoughtById(req: Request, res: Response): void {
        Thought.findOne({ _id: req.params.id })
            .then((dbThoughtData) => {
                // if no thought is found
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a thought
    deleteThought(req: Request, res: Response): void {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that ID' });
                    return;
                }

                return User.findOneAndUpdate(
                    { _id: req.body.userID },
                    { $pull: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // add Reaction
    addReaction(req: Request, res: Response): void {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with that ID :(' });
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // delete Reaction
    deleteReaction(req: Request, res: Response): void {
        console.log(req.params);

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with that ID :(' });
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    }
};

export default thoughtController;