import { Request, Response } from 'express';
import { Thought, User } from '../models';

const userController = {
    // get all users
    getAllUsers(req: Request, res: Response): void {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // create user
    createUser(req: Request, res: Response): void {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // update user by id
    updateUser(req: Request, res: Response): void {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user' });
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // delete user
    deleteUser(req: Request, res: Response): void {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with that ID' });
                } else {
                    return Thought.deleteMany({
                        _id: { $in: user.thoughts }
                    });
                }
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // getUserById
    getUserById(req: Request, res: Response): void {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with that ID' });
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // addFriend
    addFriend(req: Request, res: Response): void {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendsId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No friend found with that ID :(' });
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // removeFriend
    removeFriend(req: Request, res: Response): void {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendsId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No friend found with that ID :(' });
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json(err));
    }
};

export default userController;