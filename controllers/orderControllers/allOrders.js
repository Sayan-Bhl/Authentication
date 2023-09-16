const { Orders, OrderItems, Products, Addresses, Sellers, ProductSpecifications } = require('../../models/index');

const allOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const countOrder=await Orders.count();
        const allOrders = await Orders.findAll({
            include: [{
                model: OrderItems,
                include: {
                    model: ProductSpecifications,
                    include:[
                        {
                            model: Products,
                        },
                        {
                            model: Sellers,
                        }
                    ],
                },
            },
            {
                model: Addresses,
            }],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ data:{allOrders,countOrder} });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = allOrders;
