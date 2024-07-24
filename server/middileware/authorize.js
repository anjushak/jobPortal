const authorize = (roles = []) => {
   
      if (typeof roles === 'string') {
        roles = [roles];
      }
      return (req, res, next) => {
     if(!roles.length || (req.user && roles.includes(req.user.role)))
  
      return next();
    };
   
  };
  
  module.exports = authorize;