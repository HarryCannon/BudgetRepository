require('bootstrap-loader');
require("css/style.scss")

var React = require('react')
var ReactDOM = require('react-dom')

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

csrftoken = getCookie('csrftoken');

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="author">
                    {this.props.author}
                </h2>
                <div className="comment-text">
                    {this.props.children}
                </div>
            </div>
        )
    }
})

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        })
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
    }
})

var CommentForm = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''}
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value})
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
          return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name.."
                    value={this.state.author}
                    onChange={this.handleAuthorChange}/>
                <input
                    type="text"
                    placeholder="Say something"
                    value={this.state.text}
                    onChange={this.handleTextChange}/>
                <button type="submit" value="Post">Submit!</button>
            </form>
        )
    }
})

var NewExpenseForm = React.createClass({
    getInitialState: function() {
        return {name : '', date : '', value : 0, description : ''}
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onDateChange: function(e) {
        this.setState({date: e.target.value})
    },
    onValueChange: function(e) {
        this.setState({value: e.target.value})
    },
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name
        var date = this.state.date
        var value = this.state.value
        var description = this.state.description
        this.props.onNewExpense({name: name, date: date, value: value, description: description})
    },
    render: function() {
        return (
            <form className="newExpenseForm" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onNameChange}/>
                <input
                    type="date"
                    value={this.state.date}
                    onChange={this.onDateChange}/>
                <input
                    type="number"
                    value={this.state.value}
                    onChange={this.onValueChange}/>
                <input
                    type="text"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}/>
                <button className = "submitButton" type="submit">Submit</button>
            </form>
        )
    }
})

var newExpenseFormOld = React.createClass({
    getInitialState: function() {
        return {name : '', date : '', value : 0, description : ''}
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onDateChange: function(e) {
        this.setState({date: e.target.value})
    },
    onValueChange: function(e) {
        this.setState({value: e.target.value})
    },
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name
        var date = this.state.date
        var value = this.state.value
        var description = this.state.description
        this.props.onNewExpense({name: name, date: date, value: value, description: description})
    },
    render: function() {
        return (
            <form className="newExpenseForm" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onNameChange}/>
                <input
                    type="date"
                    value={this.state.date}
                    onChange={this.onDateChange}/>
                <input
                    type="number"
                    value={this.state.value}
                    onChange={this.onValueChange}/>
                <input
                    type="text"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}/>
                <button className = "submitButton" type="submit">Submit</button>
            </form>
        )
    }
})

var SearchDaysForm = React.createClass({
    getInitialState: function() {
        return {lower_date : '', upper_date : ''}
    },
    onLowerDateChange: function(e) {
        this.setState({lower_date: e.target.value})
    },
    onUpperDateChange: function(e) {
        this.setState({upper_date: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        var lower_date = this.state.lower_date
        var upper_date = this.state.upper_date
        this.props.onSearchDays({lower_date: lower_date, upper_date: upper_date})
    },
    render: function() {
        return (
            <form className="searchDaysForm" onSubmit={this.onSubmit}>
                <input
                    type="date"
                    value={this.state.lower_date}
                    onChange={this.onLowerDateChange}/>
                <input
                    type="date"
                    value={this.state.upper_date}
                    onChange={this.onUpperDateChange}/>
                <button className = "submitButton" type="submit">Search</button>
            </form>
        )
    }
})

var Day = React.createClass({
  onClick: function() {
    this.props.onGetExpenses(this.props.day)
  },
  sanitizeValue : function(value) {
    var dollars = value / 100;
    return "$" + dollars;
  },
  render: function() {
    var date = this.props.day.date;
    var balance = this.sanitizeValue(this.props.day.balance);

    return (
      <div className="dayButton" onClick={this.onClick}>
        <div className="dayDate">
          {date}
        </div>
        <div className="dayBalance">
          {balance}
        </div>
      </div>
    )
  }
})

var DayList = React.createClass({
    render: function() {
        var onGetExpenses = this.props.onGetExpenses
        var days = this.props.data.days.map(function(day) {
            return (
                <Day key={day.id} day={day} onGetExpenses={onGetExpenses}/>
            );
        })
        return (
          <div className="dayList">
            {days}
          </div>
        );
    }
})

var Expense = React.createClass({
  onClick: function() {
    this.props.onGetExpenseDescription(this.props.expense)
  },
  sanitizeValue : function(value) {
    var dollars = value / 100;
    return "$" + dollars;
  },
  render: function() {
    var name = this.props.expense.name;
    var value = this.sanitizeValue(this.props.expense.value);

    return (
      <div className="expenseButton" onClick={this.onClick}>
        <div className="expenseName">
          {name}
        </div>
        <div className="expenseValue">
          {value}
        </div>
      </div>
    );
  }
})

var ExpenseList = React.createClass({
    render: function() {
        var onGetExpenseDescription = this.props.onGetExpenseDescription;
        var expenses = this.props.data.expenses.map(function(expense) {
            return (
                <Expense key={expense.id} expense={expense} onGetExpenseDescription={onGetExpenseDescription}/>
            );
        });
        return (
          <div className="expenseList">
            {expenses}
          </div>
        );
    }
})

var ExpenseDescription = React.createClass({
    render: function() {
      return (
        <div className="expenseDescription">
          {this.props.data.expenseDescription}
        </div>
      )
    }
})

var MainPage = React.createClass({
    getInitialState: function() {
        return {
          days: [],
          expenses: [],
          expenseDescription: ''
        }
    },
    onSearchDays: function(data) {
        $.ajax({
          url: "/1/searchdays",
          dataType: 'json',
          cache: false,
          data: data,
          type: 'GET',
          success: function(data) {
            this.setState({days: data.days});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        this.setState({expenseDescription: ''})
        this.setState({expenses: []})
    },
    onNewExpense: function(data) {
        $.ajax({
          url: "/1/newexpense",
          dataType: 'json',
          cache: false,
          data: data,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(data){
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    onGetExpenses: function(day)
    {
        this.setState({expenses: day.expenses})
        this.setState({expenseDescription: ''})
    },
    onGetExpenseDescription: function(expense)
    {
        this.setState({expenseDescription: expense.description})
    },
    loadDataFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    onCommentSubmit: function(comment) {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: comment,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function() {
    },
    render: function() {
        return (
            <div className="mainPage">
                <h1>Budget Tracker</h1>
                <NewExpenseForm onNewExpense={this.onNewExpense}/>
                <SearchDaysForm onSearchDays={this.onSearchDays}/>
                <DayList data={this.state} onGetExpenses={this.onGetExpenses}/>
                <ExpenseList data={this.state} onGetExpenseDescription={this.onGetExpenseDescription}/>
                <ExpenseDescription data={this.state}/>
            </div>
        );
    }
})

ReactDOM.render(<MainPage pollInterval={2000}/>, document.getElementById('react-app'))