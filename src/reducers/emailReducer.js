import * as types from '../constants/actionTypes';

const initialState = {

  user: {
    userId: 1,
    userImage: `https://avatars2.githubusercontent.com/u/7544036?s=460&v=4`,
    userName: `Camaromelt`
  },

  threadList: {

    projects: [ {
      threadId: 1,
      subject: 'what what',
      createdAt: 'now',
      group: 1,
      messages: [ {
        messageId: 1,
        message: "sup",
        author: "JD",
        createdAt: "whenever"
      },
      {
        messageId: 2,
        message: "whatsssssszzzzup",
        author: "Paul",
        createdAt: "whenever + 1"
      } ],
    } ],

    approvers: [ {
      threadId: 2,
      subject: ' what',
      createdAt: 'nowwwwwww',
      messages: [ {
        messageId: 1,
        message: "doodah approver",
        author: "Ben",
        createdAt: "i dunno"
      },
      {
        messageId: 2,
        message: "whatsssssszzzzup",
        author: "Paul",
        createdAt: "whenever + 1"
      } ],
    } ],

    collaborators: [ {
      threadId: 3,
      subject: 'adsfasfas adsf',
      createdAt: 'dfdfd',
      group: 1,
      messages: [ {
        messageId: 1,
        message: "aaaa",
        author: "Maddie",
        createdAt: "u"
      },
      {
        messageId: 2,
        message: "adfaf",
        author: "JD",
        createdAt: "w + 1"
      } ],
    } ],

    informed: [ {
      threadId: 4,
      subject: 'what what',
      createdAt: 'now',
      group: 1,
      messages: [ {
        messageId: 1,
        message: "sup",
        author: "JD",
        createdAt: "whenever"
      },
      {
        messageId: 2,
        message: "whatsssssszzzzup",
        author: "Paul",
        createdAt: "whenever + 1"
      },
      messageId: 3,
      message: "yayayaya",
      author: "Alex",
      createdAt: "whenever + 2"
    } ],
 }

};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.ADD_STORY:
    //   return Object.assign({}, state, {
    //     item: 'new item'
    //   });
    default:
      return state;
  }
}

export default emailReducer
