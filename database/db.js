import mongoose from 'mongoose'

const Connection = () =>
{
    const db_link = "mongodb+srv://admin:bXuZqb4GWMxheQ1G@cluster0.i6emt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose.connect(db_link, { useUnifiedTopology: true})
        .then(() => console.log('db connection done'))
        .catch((err) => console.log(err.message))
}

export default Connection;