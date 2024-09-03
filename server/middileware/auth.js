const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// const auth = async (req, res, next) => {
//     try {
//         const bearerToken = req.headers['authorization'];
        
//         if (!bearerToken) {
//             console.log('No token provided');
//             return res.status(401).send({ message: 'No token provided' });
//         }

//         const response = bearerToken.split(' ');

//         if (response.length !== 2 || response[0] !== 'Bearer') {
//             console.log('Invalid token format');
//             return res.status(401).send({ message: 'Invalid token format' });
//         }

//         const token = response[1];

//         jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
//             if (err) {
//                 console.log('Token error:', err.message);
//                 if (err.name === 'TokenExpiredError') {
//                     return res.status(401).send({ message: 'Token has expired' });
//                 } else {
//                     return res.status(401).send({ message: 'Invalid token' });
//                 }
//             }

//             const user = await User.findById(decoded.sub._id);
            
//             if (!user) {
//                 console.log('User not found');
//                 return res.status(401).send({ message: 'User not found' });
//             }

//             req.user = user;
//             next();
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };

// module.exports = { auth };



const auth = async (req, res, next) => {
    try {
        const bearerToken = req.headers['authorization'];
        
        if (!bearerToken) {
            return res.status(401).send({ message: 'No token provided' });
        }

        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        

      
        if (!decoded || !decoded.sub) {
            return res.status(401).send({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.sub);
        if (user.Blocked) {
            return res.status(403).send({ error: 'Your account is blocked.' });
          }
      

        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
};


module.exports={auth}