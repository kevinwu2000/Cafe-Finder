import mongoose from 'mongoose';
import * as CryptoJS from 'crypto-js';

const secretKey = "IHVYRTyknIBUYTNTCYVUBJnnJhgfjnBHRYTusc";
const Query = {
  async LogInQuery(parent, args, { UserModel }, info){
    //console.log(args.password)
    args.account = CryptoJS.AES.decrypt(args.account,secretKey).toString(CryptoJS.enc.Utf8);
    args.password = CryptoJS.AES.decrypt(args.password,secretKey).toString(CryptoJS.enc.Utf8);
    let user = await UserModel.findOne({ account:args.account });
    if(user){
      if(CryptoJS.AES.decrypt(user.password,secretKey).toString(CryptoJS.enc.Utf8) === args.password)return user;
      else return { name:"wrong password", account: "wrong password", password: "wrong password",id:"wrong password" };
    }
    else{
      user = { name:"not found", account: "not found", password: "not found",id:"not found" };
      return user;
    }
  },
  async SearchRestaurantByName(parent, args, { RestaurantModel }, info){
    //console.log(RestaurantModel.find({name:args.name}))
    //console.log(RestaurantModel.find({ name: { "$regex": args.name, "$options": "i" } }))//.name.toLowerCase()
    return RestaurantModel.find({ name: { "$regex": args.name, "$options": "i" } })
    //return RestaurantModel.find({name:args.name});
    //return RestaurantModel.find().name.toLowerCase();
  },
  async GetRestaurantById(parent, args, { RestaurantModel }, info){
    //need to input valid id, or an error will appear.
    return RestaurantModel.findOne({_id:args.id})
  }
};

export { Query as default };
