const mongoose = require("mongoose");
const RoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "new room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
