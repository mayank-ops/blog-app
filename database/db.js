import mongoose from 'mongoose'
import Pusher from 'pusher'

const pusher = new Pusher({
    appId: "1312053",
    key: "83a9269d53efd71b9741",
    secret: "3578d7e4b08f034898d2",
    cluster: "ap2",
    useTLS: true
});

const Connection = () =>
{
    const db_link = "mongodb+srv://admin:bXuZqb4GWMxheQ1G@cluster0.i6emt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose.connect(db_link, { useUnifiedTopology: true })
        .then(() => console.log('db connection done'))
        .catch((err) => console.log(err.message))

    const db = mongoose.connection;
    db.once('open', () =>
    {
        console.log('db connection open');
        const changeStream = db.collection('comments').watch();
        changeStream.on('change', (change) =>
        {
            if (change.operationType === 'insert') {
                pusher.trigger('comments', 'newComment', {
                    "change": change
                })
            }
            else if(change.operationType === 'delete'){
                pusher.trigger('comments', 'commentDeleted', {
                    "change": change
                })
            }
        })
    })
}

export default Connection;