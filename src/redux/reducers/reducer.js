import * as actions from '../actions/actionType';

export default  function reducer(state = [], action) {
    switch(action.type) {
        case actions.VIEW_DETAIL_TYPE:
        return  { 
            'viewItem': action.viewItem,
            'viewId': action.viewId
        }
        case actions.EDIT_PROJECT:
        return  {
            'viewItem': action.viewItem,
            'companyId': state.viewItem === action.viewItem ? state.companyId.concat(action.companyId) : action.companyId
        }
        default:
            return state
    }
    
}

