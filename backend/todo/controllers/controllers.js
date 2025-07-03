import User from '../../users/model/model.js';

export const addTodo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const { title, description } = req.body;
        if (!title || !description) {   
            return res.status(400).json({ message: 'Title and description are required' });
        }
        const newTodo = {
            title,
            description,
            updatedAt: new Date()
        };

        user.data.push(newTodo);
        await user.save();
        res.status(200).json({ message: 'Todo added successfully', data: newTodo });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const index = req.params.index;
        if (index < 0 || index >= user.data.length) {
            return res.status(400).json({ message: 'Invalid index' });
        }

        user.data.splice(index, 1); // remove the task
        await user.save();

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editTodo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const index = req.params.index;
        if (index < 0 || index >= user.data.length) {
            return res.status(400).json({ message: 'Invalid index' });
        }

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        user.data[index].title = title;
        user.data[index].description = description;
        user.data[index].updatedAt = new Date();
        await user.save();

        res.status(200).json({ message: 'Todo edited successfully', data: user.data[index] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}