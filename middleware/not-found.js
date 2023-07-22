const notFound = async (req, res) => {
    res.status(404).send('No Resource Found')
}
module.exports = notFound