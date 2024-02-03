import {v4 as uuidv4} from 'uuid';
import * as CryptoJS from 'crypto-js';

const secretKey = "IHVYRTyknIBUYTNTCYVUBJnnJhgfjnBHRYTusc";
const Mutation = {
  async createUser(parent, args, { UserModel }, info){
    let user = await UserModel.findOne({ account:args.account });
    if(user){
      user.name = "account taken!!";
      user.account = "account taken!!";
      user.password = "account taken!!";
      return user;
    }
    else{
      user = await new UserModel({ name:args.name, account: args.account, password: args.password }).save();
      return user;
    }
  },
  async createRestaurant(parent, args, { RestaurantModel }, info){
    //let restaurant = await RestaurantModel.findOne({ name:args.name });
    //if(!restaurant)restaurant = await new RestaurantModel({name:args.name, information:args.information, comments:[], sprate:[], spTFrate:[], graph:[]}).save();
    console.log("//")
    let restaurant = await new RestaurantModel({name:args.name, information:args.information, comments:[], sprate:[], spTFrate:[], graph:[]}).save();
    console.log("///")
    return restaurant;
  },
  async createComment(parent, args, { UserModel, RestaurantModel }, info){
    //need to input valid id, or an error will appear.
    console.log('//')
    let restaurant = await RestaurantModel.findOne({_id:args.restaurantid}).exec()
    for(let i=0;i<restaurant.comments.length;i++){
      if(restaurant.comments[i].person_id == args.userid){
        restaurant.comments[i] = {name: args.name, person_id:args.userid, body:args.body, star:args.star, time:args.time}
        restaurant.save();
        return restaurant.comments//{name: args.name, person_id:args.userid, body:args.body, star:args.star, time:args.time}
      }
    }

    restaurant.comments.push({name: args.name, person_id:args.userid, body:args.body, star:args.star, time:args.time})
    restaurant.save();
    return [{name: args.name, person_id:args.userid, body:args.body, star:args.star, time:args.time}]
  },
  async createRate(parent, args, { UserModel, RestaurantModel }, info){
    //need to input valid id, or an error will appear.
    let restaurant = await RestaurantModel.findOne({_id:args.restaurantid}).exec()
    for(let i=0;i<restaurant.sprate.length;i++){
      if(restaurant.sprate[i].name == args.ratewhat){
        console.log('/')
        restaurant.sprate[i].people = restaurant.sprate[i].people.filter((item)=>item.person_id != args.userid)
        restaurant.sprate[i].people.push({person_name: args.name, person_id: args.userid, star:args.star})
        restaurant.sprate[i].average_star = 0.0
        console.log('//')
        for(let j=0;j<restaurant.sprate[i].people.length;j++){
          restaurant.sprate[i].average_star += restaurant.sprate[i].people[j].star
        }
        restaurant.sprate[i].average_star /= restaurant.sprate[i].people.length
        console.log('///')
        restaurant.save();
        return restaurant.sprate[i]
      }
    }
    restaurant.sprate.push({name:args.ratewhat, people:[{person_name: args.name, person_id: args.userid, star:args.star}], average_star:args.star})
    restaurant.save();
    return {name:args.ratewhat, people:[{person_name: args.name, person_id: args.userid, star:args.star}], average_star:args.star}
  },
  async createTFRate(parent, args, { UserModel, RestaurantModel }, info){
    //need to input valid id, or an error will appear.
    let restaurant = await RestaurantModel.findOne({_id:args.restaurantid}).exec()
    for(let i=0;i<restaurant.spTFrate.length;i++){
      if(restaurant.spTFrate[i].name == args.ratewhat){
        restaurant.spTFrate[i].Tnum = restaurant.spTFrate[i].Tnum.filter((item)=>item.person_id != args.userid)
        restaurant.spTFrate[i].Fnum = restaurant.spTFrate[i].Fnum.filter((item)=>item.person_id != args.userid)
        if(args.TF === true)restaurant.spTFrate[i].Tnum.push({person_name: args.name, person_id: args.userid})
        else restaurant.spTFrate[i].Fnum.push({person_name: args.name, person_id: args.userid})
        restaurant.save();
        return restaurant.spTFrate[i]
      }
    }
    if(args.TF === true){
      restaurant.spTFrate.push({name:args.ratewhat, Tnum:[{person_name: args.name, person_id: args.userid}], Fnum:[]})
      restaurant.save();
      return {name:args.ratewhat, Tnum:[{person_name: args.name, person_id: args.userid}], Fnum:[]}
    }
    else{
      restaurant.spTFrate.push({name:args.ratewhat, Fnum:[{person_name: args.name, person_id: args.userid}], Tnum:[]})
      restaurant.save();
      return {name:args.ratewhat, Fnum:[{person_name: args.name, person_id: args.userid}], Tnum:[]}
    }

  },
  async createGraph(parent, args, { UserModel, RestaurantModel }, info){
    //need to input valid id, or an error will appear.
    //console.log("//")
    let restaurant = await RestaurantModel.findOne({_id:args.restaurantid}).exec()
    //console.log(args.graph)
    restaurant.graph.push(args.graph)
    restaurant.save();
    //console.log(restaurant.graph)
    return args.graph;
  }

};

export { Mutation as default };
