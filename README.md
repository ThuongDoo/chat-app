# Client API Documentation

## Settings

### Client Version

- **Name:** `Client version`
- **Type:** String
- **Description:** Specifies the version of the client that will be used for connecting with the server.
- **Example:** `v3`

### Handshake Path

- **Name:** `Handshake path`
- **Type:** String
- **Description:** Specifies the server path that will be used during the handshake request.
- **Example:** `/socket.io`

## Events

### newMessage

- **Name:** `newMessage`
- **Description:** Triggered when a new message is received.

### userJoin

- **Name:** `userJoin`
- **Description:** Triggered when a user joins the chat.

### error

- **Name:** `error`
- **Description:** Triggered when an error occurs.

### success

- **Name:** `success`
- **Description:** Triggered when an operation is successful.

### friendRequest

- **Name:** `friendRequest`
- **Description:** Triggered when a friend request is received.

### sendMessage

- **Name:** `sendMessage`
- **Description:** Triggered when a message is sent.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "roomId": "658ebdf5814ce63ae8c0e106",
    "message": "Xin chao"
  }
  ```

### joinRoom

- **Name:** `joinRoom`
- **Description:** Triggered when a user joins a chat room.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "roomId": "658ebdf5814ce63ae8c0e106"
  }
  ```

### register

- **Name:** `register`
- **Description:** Triggered when a user registers.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "name": "thuongdo3",
    "password": "123456",
    "phone": "1234563"
  }
  ```

### logout

- **Name:** `logout`
- **Description:** Triggered when a user logs out.
- **Payload Type:** JSON

### login

- **Name:** `login`
- **Description:** Triggered when a user logs in.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "name": "thuongdo2",
    "password": "123456",
    "phone": "1234562"
  }
  ```

### sendFriendRequest

- **Name:** `sendFriendRequest`
- **Description:** Triggered when a user sends a friend request.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "friendId": "658ea588243d1a39bcac0b64"
  }
  ```

### addFriend

- **Name:** `addFriend`
- **Description:** Triggered when a friend is added.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "friendId": "658ea560243d1a39bcac0b60"
  }
  ```

### showMe

- **Name:** `showMe`
- **Description:** Triggered to display user information.
- **Payload Type:** Text

### addRoomMember

- **Name:** `addRoomMember`
- **Description:** Triggered when a user is added to a chat room.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "members": [
      "658c4206f12565ffd78d92b8",
      "658d4da7dd9dac31a0c3d4bc",
      "658db9e89a24b011960e3eb8",
      "658ea560243d1a39bcac0b60"
    ],
    "roomId": "658eb50b0b8723ab0050ed92"
  }
  ```

### createRoomChat

- **Name:** `createRoomChat`
- **Description:** Triggered when a chat room is created.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "members": ["658ebd6a814ce63ae8c0e0eb", "658ebd5e814ce63ae8c0e0e8"]
  }
  ```

### createDualChat

- **Name:** `createDualChat`
- **Description:** Triggered when a dual chat is created.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "memberId": "658ea588243d1a39bcac0b64"
  }
  ```

### deleteRoomMember

- **Name:** `deleteRoomMember`
- **Description:** Triggered when a user is removed from a chat room.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "roomId": "658eb1018dd19ebf694ac49b",
    "members": ["658ea588243d1a39bcac0b64", "658ea58e243d1a39bcac0b67"]
  }
  ```

### getUserRooms

- **Name:** `getUserRooms`
- **Description:** Returns information about user rooms.
- **Payload Type:** Text

### getRoomMessages

- **Name:** `getRoomMessages`
- **Description:** Retrieves messages from a chat room.
- **Payload Type:** JSON
- **Example:**
  ```json
  {
    "roomId": "658ebdf5814ce63ae8c0e106"
  }
  ```
