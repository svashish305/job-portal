import React, { useState } from "react";

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
  return (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
};

function CandidateJobList(props) {
  const checkList = [];

  for (let i = 0; i < props.jobs.length; i++) {
    checkList[props.jobs._id] = false;
  }

  const [checkedItems, setCheckedItems] = useState(checkList);

  const selectJobs = (checkedItems) => {
    console.log(checkedItems);
  };

  return (
    <div>
      <h2 className="mb-2rem">Apply to following jobs:</h2>
      {props.jobs.map((item) => (
        <label key={item._id}>
          {item.company} - {item.desc}
          <Checkbox
            name={item._id}
            checked={checkedItems[item._id]}
            onChange={(e) =>
              setCheckedItems([
                ...checkedItems,
                { [e.target.name]: e.target.checked ? true : false },
              ])
            }
          />
        </label>
      ))}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={selectJobs(checkedItems)}
      >
        Apply
      </button>
    </div>
  );
}

export default CandidateJobList;
