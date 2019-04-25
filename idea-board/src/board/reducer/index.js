const MAX_DESC_LIMIT = 50;

const moveIdea = (state, sourceIdx, targetIdx=sourceIdx-1) => {
  const movingIdea = state[sourceIdx];
  state = state.filter((idea, index)=>index !== sourceIdx).reduce(function(ideas, idea, index) {
    index === targetIdx ? ideas.push(movingIdea, idea) : ideas.push(idea);
    return ideas;
  }, []);
  return state;
};

const appReducer = (moment) => function(state, action){
  switch(action.type){
    case 'add' : {
      return [
        {
          id: moment().format('x'),
          title: '',
          description: '',
          descCountDown: MAX_DESC_LIMIT,
          created: moment().format('x'),
          creationDate: moment().format('LLL'),
          lastUpdated: ''
        },
        ...state
      ]
    }
    case 'update' : {
      return state.map(idea=>{
        if(idea.id === action.payload.id){
          const desc = action.payload.description.substr(0, MAX_DESC_LIMIT);
          return {
            ...idea,
            title: action.payload.title,
            description: desc,
            descCountDown: MAX_DESC_LIMIT - desc.length,
            lastUpdated: moment().format('LLL')
          }
        }
        return idea;
      });
    }
    case 'reset' : {
      return action.payload;
    }
    case 'delete' : {
      return state.filter(idea=>(
        idea.id !== action.payload
      ));
    }
    case 'moveUp' : {
      return moveIdea(state, action.payload);
    }
    case 'orderByCreationDate' : {
      return [...state].sort(function(a, b) {
        return b.created - a.created;
      });
    }
    case 'orderByTitle' : {
      return [...state].sort(function(a, b) {
        var nameA = a.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
