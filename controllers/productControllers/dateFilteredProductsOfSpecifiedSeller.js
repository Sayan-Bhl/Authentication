const { Products, Categories } = require('../../models/index');
const dateFilteredProductsOfSpecifiedSeller = async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate); // Example: '2023-08-01'
        const endDate = new Date(req.query.endDate);  // Example: '2023-08-15'

        // Set the time to 23:59:59
        endDate.setHours(23, 59, 59, 0);
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        const seller_id = req.params.seller_id;
        const products = await Products.findAll({
            include:
            {
                model: Categories,
            },
            
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
                seller_id: seller_id,
            },
        });
        if (!products) return res.status(400).json({ msg: 'No products found' });
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
module.exports = dateFilteredProductsOfSpecifiedSeller;