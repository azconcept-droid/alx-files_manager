import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });

    const old_user = await dbClient.userCollection.findOne({ email });

    if (old_user) return res.status(400).json({ error: 'Already exist' });

    const user = await dbClient.userCollection.insertOne({
      email,
      password: sha1(password),
    });

    return res.status(201).json({ id: user.insertedId, email });
  }

  static async getMe(req, res) {
    const old_user = await dbClient.findUserById(req.userId);

    if (!old_user) return res.status(401).json({ error: 'Unauthorized' });

    return res.status(200).json({ id: old_user._id, email: old_user.email });
  }
}
