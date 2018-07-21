import express from 'express';
import { fetchNewRoomId, verifyParty, deleteRoom } from '../controllers';

const router = express.Router();

router.route('/new-room')
  .post(fetchNewRoomId);

router.route('/verify')
  .post(verifyParty)

router.route('/delete-room')
  .delete(deleteRoom)
// // Authorization route for login
// router.route('/users/auth')
//   .post(authUser);

// // CRUD ops for users
// router.route('/users')
//   .post(createUser);
// router.route('/users/:id')
//   .put(userUpdate)
//   .delete(userDelete);

// // CRUD ops for slings
// router.route('/slings/:slingId')
//   .get(slingFetch)
//   .post(verifyUserWithJWT, slingPost)
//   .put(slingUpdate)
//   .delete(verifyUserWithJWT, slingDelete);

// router.route('/new-sling')
//   .get(verifyUserWithJWT, fetchNewSlingId);

// router.route('/slings/messages/:slingId')
//   .get(slingMsgFetch)
//   .post(slingMsgPost);

export default router;