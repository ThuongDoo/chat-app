# Realtime Chat API Documentation

## Client Version

- **v3**: Specifies the client version to be used for connecting with the server.

## Handshake Path

- **/socket.io**: Server path used during the handshake request.

## Events

### 1. **newMessage**

- **Description**: Event triggered when a new message is received.

### 2. **updateUsers**

- **Description**: Event triggered when the list of users is updated.

### 3. **error**

- **Description**: Event triggered when an error occurs.

### 4. **success**

- **Description**: Event triggered when an operation is successful.

### 5. **friendRequest**

- **Description**: Event triggered when a friend request is received.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "friendId": "658c4206f12565ffd78d92b8"
  }
  ```

### 6. **sendMessage**

- **Description**: Event to send a message.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "roomId": "658dc0ecd1f8e1c62e9d881c",
    "message": "xin chao ban hhao ho"
  }
  ```

### 7. **joinRoom**

- **Description**: Event to join a chat room.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "roomId": "658dc0ecd1f8e1c62e9d881c"
  }
  ```

### 8. **register**

- **Description**: Event for user registration.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "name": "thuonthuong",
    "password": "123451",
    "phone": "123415"
  }
  ```

### 9. **logout**

- **Description**: Event for user logout.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "name": "thuonthuong",
    "password": "123451",
    "phone": "123415"
  }
  ```

### 10. **login**

- **Description**: Event for user login.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "name": "thuonthuong",
    "password": "123451",
    "phone": "123415"
  }
  ```

### 11. **sendFriendRequest**

- **Description**: Event to send a friend request.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "friendId": "658c4206f12565ffd78d92b8"
  }
  ```

### 12. **addFriend**

- **Description**: Event to add a friend.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "friendId": "658c4206f12565ffd78d92b8"
  }
  ```

### 13. **showMe**

- **Description**: Event to display user information.
- **Payload Type**: Text

### 14. **addRoomMember**

- **Description**: Event to add members to a chat room.
- **Payload Type**: JSON
- **Payload Example**:
  ```json
  {
    "members": [
      "658c4206f12565ffd78d92b8",
      "658d4da7dd9dac31a0c3d4bc",
      "658db9e89a24b011960e3eb8"
    ]
  }
  ```

---

This documentation provides details on the events, their purposes, and the expected payload format for your Realtime Chat API. Refer to this guide to seamlessly integrate the API into your frontend application.
