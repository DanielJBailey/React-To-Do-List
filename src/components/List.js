import React from 'react';
let moment = require('moment');

const List = props => {
	let doneList;
	let currentList;
	let doneTitle;
	let donehr;
	let currenthr;
	let currentTitle;
	
	if (props.list.length > 0) {
		currentTitle = <h4 className="task-title">Current Tasks</h4>;
		currenthr = <hr />;
		currentList = props.list.map(function(item) {
			return (
				<li key={item} className="current-item">
					<div className="item-description">{item.text}</div>
					<div className="date-actions">
						<div className="item-date">{item.date}</div>
						<div className="item-actions">
							<button onClick={props.finish.bind(this, item)} className="check">
								<i className="fas fa-check" />
							</button>
							<button onClick={props.remove.bind(this, item)} className="trash">
								<i className="fas fa-trash trash" />
							</button>
						</div>
					</div>
				</li>
			);
		});
	}
	if (props.done.length > 0) {
		doneTitle = <h4 className="task-title">Completed Tasks</h4>;
		donehr = <hr />;
		doneList = props.done.map(function(item) {
			return (
				<li key={item} className="done-item">
					<div className="item-description">{item.text}</div>
					<div className="date-actions">
						<div className="item-date">{moment(new Date()).format("h:mm a")}</div>
						<div className="item-actions">
							<button onClick={props.removeFinished.bind(this, item)} className="trash">
								<i className="fas fa-trash trash" />
							</button>
						</div>
					</div>
				</li>);
		});
	}

	return (
		<div>
			{currentTitle}
			{currenthr}
			<ul className="task-list">{currentList}</ul>
			{doneTitle}
			{donehr}
			<ul className="task-list">{doneList}</ul>
		</div>
	);
};

export default List;