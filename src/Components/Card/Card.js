import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ props }) => {
  const {
    id,
    priority,
    created_at,
    summary,
    category,
    no_of_comments,
    attachment_count,
    user
  } = props;

  const colorCode = {
    High: "orange",
    Low: "skyblue",
    Normal: "limegreen",
    Urgent: "red"
  };

  return (
    <div key={id} className="card-container">
      <div className="card-header">
        <div className="card-priority">
          <div
            className="priority-tag"
            style={{ backgroundColor: `${colorCode[priority]}` }}
          >
            {priority}
          </div>
          <div className="card-id">#{id}</div>
        </div>
        <div className="card-created">{created_at}</div>
      </div>
      <div className="card-summary">{summary}</div>
      <div className="card-tags">{category}</div>
      <div className="card-footer">
        <div className="card-count">
          <div>
            <i className="comment-icon fa fa-comments"></i>
            {no_of_comments}
          </div>
          <div>
            <i className="comment-icon fa fa-paperclip" aria-hidden="true"></i>
            {attachment_count}
          </div>
        </div>
        <div>
          <img className="user-thumbnail" src={user} alt="user" />
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  id: "",
  priority: "",
  created_at: "",
  summary: "",
  category: "",
  no_of_comments: "",
  attachment_count: "",
  user: ""
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  no_of_comments: PropTypes.string.isRequired,
  attachment_count: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

export default Card;
