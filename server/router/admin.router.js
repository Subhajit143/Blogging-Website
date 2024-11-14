import express from 'express';
import { deleteContactById, deleteUserById, getAllContacts , getAllUsers, getUserById, updateUserById } from '../controllers/admin.controller.js';
import { authmiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';


 const adminRouter= express.Router();
//  const adminContactRouter= express.Router();



 //authMiddleware is to be used to find either Login datas are true or not (also cheak about Token availability )
//adminMiddleware is to be used to find that is this the user has isAdmin true
 adminRouter.route('/users').get(authmiddleware,adminMiddleware,getAllUsers);
 adminRouter.route('/contact').get(authmiddleware,adminMiddleware,getAllContacts);
 //Get user by id Route 
 adminRouter.route('/users/:id').get(authmiddleware,adminMiddleware,getUserById);

 //Update Route
 adminRouter.route('/users/update/:id').patch(authmiddleware,adminMiddleware,updateUserById)


// delete user method is to be used
adminRouter.route('/users/delete/:id').delete(authmiddleware,adminMiddleware,deleteUserById)
//delete Contact method is to be used
adminRouter.route('/contact/delete/:id').delete(authmiddleware,adminMiddleware,deleteContactById)

export {adminRouter}
