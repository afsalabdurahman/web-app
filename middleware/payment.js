let User_schema = require("../model/userModel");
const Product = require("../model/productModel");
const UserCart = require("../model/cartModel");

const Checkstatus = async (req, res, next) => {

    try {
///

function generateOrderID() {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Generates a random number between 1000 and 9999
    const orderID = `OrderID#${randomNumber}`;
    return orderID;
}




////
        console.log(req, "working")
        console.log(req.query, "alllorders query")
        let add = ""
        const userdata = await User_schema.findById(req.session.user_id)
        console.log(userdata, "userdatasss")
        console.log(req.session.user_id, "useriddd1111111")
        if (req.session.user_id) {
            console.log(req.session.user_id, "useriddd")
            userdetails = await User_schema.findById({ _id: req.session.user_id }).lean()
            if (req.query.id == "address2") {
                add = userdetails.address2.address + " " + userdetails.location
                console.log(add, "add11111")
            } else {
                add = userdetails.address + " " + userdetails.location
                console.log(add, "222")
            }


            const exist = await UserCart.find({ orderStatus: "Pending" }).lean()
            console.log(exist, "existtttt")
            if (exist.length != 0) {

                 newOrderID = generateOrderID();
                const Data = await UserCart.updateMany({ UserId: req.session.user_id, orderStatus: "Pending" }, {
                    $set: {
                        orderStatus: 'Processing',
                        Date: new Date(),
                        address: add,
                        Username: userdata.name,
                        email: userdata.email,
                        orderId:newOrderID 

                    }
                }, { upsert: true })
                console.log(Data, "Dasttatta")
                next();
            } else {
                next()
                // res.render("user/profile/AllOrders.hbs ", { user: true })
            }
        } else {
            res.send("user not found")
            // res.render("user/profile/AllOrders.hbs", { user })
        }

    } catch (error) {
        console.log(error, "this is error")



    }
}
module.exports = {
    Checkstatus
}
