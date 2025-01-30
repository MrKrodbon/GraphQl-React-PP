import {gql, useSubscription} from "@apollo/client"

const MESSAGES_SUBSCRIPTION = gql`
subscription TodoAdded {
    todoAdded {
      id
      title
      completed
    }
  }`;

function Messages() {
    const {data,loading} = useSubscription(MESSAGES_SUBSCRIPTION,{onSubscriptionData:({data}) => {console.log("message received",data);
    }})
    return (
        <div>
            <h2>Messaage from subscription</h2>
            <p>{data}</p>
        </div>
    );
}

export default Messages;