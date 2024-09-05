import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { LiaBusinessTimeSolid } from "react-icons/lia";

// job card component
const JobCard = ({ job, onEdit, onDelete, isUser, isApplied, onApply }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // defining an array of skill colors
  const skillColors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-red-500",
  ];

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 h-64 w-90 flex flex-col relative">
      <div className="flex justify-between items-start mt-2">
        <h2 className="text-lg font-semibold truncate w-3/4">{truncateText(job.position, 22)}</h2>
        {!isUser && (
          <div className="flex space-x-2">
            <button onClick={onEdit} className="text-gray-500 hover:text-blue-700">
              <FiEdit2 className="text-xl" />
            </button>
            <button onClick={onDelete} className="text-gray-500 hover:text-red-700">
              <FiTrash2 className="text-xl" />
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm truncate mb-2">{truncateText(job.company, 25)}</p>
      <p className="text-gray-600 text-sm flex items-center font-mono">
        <IoLocationOutline className="mr-1" />
        {truncateText(job.location, 22)}
      </p>
      <p className="text-gray-600 text-sm flex items-center mb-2 font-mono">
        <LiaBusinessTimeSolid className="mr-1"/>
        {job.contract}
      </p>
      <p className="text-sm h-16 overflow-hidden">
        {truncateText(job.description)}
      </p>
      <div className="flex flex-wrap gap-1 mt-4">
        {job.skills.slice(0, 4).map((skill, index) => (
          <span
            key={skill}
            className={`${skillColors[index % skillColors.length]} text-white text-xs px-2 py-1 rounded-full`}
          >
            {truncateText(skill, 10)}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
            +{job.skills.length - 3}
          </span>
        )}
      </div>
      {isUser && (
        <button
          onClick={() => onApply(job._id)}
          disabled={isApplied}
          className={`absolute top-4 right-6 px-3 py-3 text-xs rounded text-white ${
            isApplied ? 'bg-green-500 cursor-not-allowed' : 'bg-[#682c94] hover:bg-[#7e37b3]'
          }`}
        >
          {isApplied ? 'Applied' : 'Apply'}
        </button>
      )}
    </div>
  );
};

export default JobCard;
