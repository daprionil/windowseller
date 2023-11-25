const { Router } = require('express');

const userCategoryRouter = Router();

//* Generate routes
userCategoryRouter.get('/:tokenIdCategory', (req,res) => {
    try {
        const { tokenIdCategory } = req.params;

        res.send('Mi categoría' + tokenIdCategory);
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    }
})

//? Export the router
module.exports = userCategoryRouter;