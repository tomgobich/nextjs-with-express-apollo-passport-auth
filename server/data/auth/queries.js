module.exports = {
  account(root, args, req) {
    return new Promise((resolve, reject) => {
      if (req.user) {
        return resolve(req.user)
      }

      return resolve(null)
    })
  }
}
