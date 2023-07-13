import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroup, addMembersToGroup } from "../../slices/groupChatSlice";
import io from "socket.io-client";

export default function Job_UI_app() {
  const [groupName, setGroupName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [groupIdToAddMembers, setGroupIdToAddMembers] = useState("");
  const [newMemberIds, setNewMemberIds] = useState("");
  const [memberIds, setMemberIds] = useState("");
  const dispatch = useDispatch();
  const selectedGroupId = useSelector((state) => state.group.selectedGroupId);
  const groups = useSelector((state) => state.group.groups);

  const handleCreateGroup = () => {
    const membersArray = memberIds.split(",").map((id) => id.trim());
    dispatch(createGroup(groupName, membersArray));
  };

  const handleAddMembers = () => {
    const memberIds = newMemberIds.split(",").map((id) => id.trim());
    dispatch(addMembersToGroup(groupIdToAddMembers, memberIds));
  };
  return (
    <div className="ml-64">
      <h1>Create Group</h1>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
      />
      <input
        type="text"
        value={memberIds}
        onChange={(e) => setMemberIds(e.target.value)}
        placeholder="Member IDs (comma-separated)"
      />
      <button onClick={handleCreateGroup}>Create Group</button>

      <h1>Add Members to Group</h1>
      <input
        type="text"
        value={groupIdToAddMembers}
        onChange={(e) => setGroupIdToAddMembers(e.target.value)}
        placeholder="Group ID"
      />
      <input
        type="text"
        value={newMemberIds}
        onChange={(e) => setNewMemberIds(e.target.value)}
        placeholder="New Member IDs (comma-separated)"
      />
      <button onClick={handleAddMembers}>Add Members</button>

      {selectedGroupId && <p>Selected Group ID: {selectedGroupId}</p>}
      {groups.length > 0 && (
        <div>
          <h3>Group List:</h3>
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                Group ID: {group.id}, Members: {group.members.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
