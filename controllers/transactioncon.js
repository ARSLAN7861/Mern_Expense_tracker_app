const Transaction = require('../models/Transaction') 


//@drsc GET all transactions
//@route  GET /api/v1/transactions
//@access Public 

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json(
            {
                success: true,
                count: transactions.length,
                data: transactions
            }
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

//@drsc ADD transactions
//@route  POST /api/v1/transactions
//@access Public 

exports.addTransaction = async (req, res, next) => {

    try {
        const {text , amount} = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
        success: true,
        data: transaction
    });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }

    
};



//@drsc Delete transactions
//@route  DELETE /api/v1/transactions/:id
//@access Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.id;

        const transaction = await Transaction.findByIdAndDelete(transactionId);

        if (!transaction) {
            console.log('Transaction not found');
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }


        
        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        console.error(`Error deleting transaction: ${error.message}`);
        return res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};