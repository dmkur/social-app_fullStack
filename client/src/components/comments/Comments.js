import "./comments.scss"
import {useContext, useState} from "react";
import {AuthContext,} from "../../context";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import moment from "moment/moment";

const Comments = ({postId}) => {
    const [desc, setDesc] = useState('');
    const {currentUser} = useContext(AuthContext);

    const {isLoading, error, data} = useQuery(['comments'], () =>
        makeRequest.get('/comments?postId=' + postId).then((res) => {
            return res.data
        })
    );

    const queryClient = useQueryClient()

    const mutation = useMutation((newComment) => {
        return makeRequest.post('/comments', newComment)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
        },
    })

    const handleClick = async (e) => {
        e.preventDefault()
        mutation.mutate({desc, postId})
        setDesc('')
    };

    console.log(desc)

    return (
        <div className={'comments'}>
            <div className="write">
                <img src={"/upload/"+currentUser.profilePic} alt=""/>
                <input
                    type="text"
                    placeholder={'Write a comment'}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading ? "Loading" : data.map(comment => (
                <div className={'comment'}>
                    <img src={"/upload/"+comment.profilePic} alt=""/>
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className={'date'}>{moment(comment.createdAt).fromNow()}</span>
                </div>)
            )}
        </div>
    )
};

export {Comments};
