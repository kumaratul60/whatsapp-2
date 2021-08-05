import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAllreadyExists(input) &&
      input !== user.email
    ) {
      // We add  the chat into the DB 'chats' collection if it doesn't already exist and is valid
      db.collection("chats").add({
        users: [user.email, input],
        //  user.email -> person who is looged in
        // input -> gest person
      });
    }
  };

  const chatAllreadyExists = (recipientEmail) =>
    // optional chaining:-> It fixes the problem of having to do multiple null checks when accessing a long chain of object properties in JavaScript.
    //  "?. can be used to chain properties that may be null or undefined."
    //  If either of those chained properties is null or undefined, JavaScript will return undefined.

    //   -> if value present return true == !!, otherwise return false means value is undefined or null or even empty string.

    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat </SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  overflow-y: scroll;
  /* responsive purpose */
  min-width: 300px;
  max-width: 350px;

  /* webkit-scrollbar for hide the scrollbar */

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox*/
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;

  /* top of everything when  scrolling overflow  */
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

// styled.input -> for change in native html element
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
