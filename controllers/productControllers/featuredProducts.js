const { Products, ProductSpecifications, Categories , SubCategories} = require('../../models/index');

const featuredProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        const productCount = await Products.count({ where: { is_featured: true } });
        const products = await Products.findAll({
            include: [
                {
                    model: SubCategories,
                    include:{
                        model: Categories,
                    }
                },
                {
                    model: ProductSpecifications,
                },
            ],
            offset,
            limit,
        },
        { where: { is_featured: true } });
        if (!products || products.length === 0) return res.status(400).json({ msg: 'No products found' });
        return res.status(200).json({ data:{products, productCount }});

    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = featuredProducts;