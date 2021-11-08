import * as actions from '../actions/actionType';

let edit_id = 0;

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
            'editId': edit_id++,
            'companyId': action.companyId
        }
        default:
            return state
    }
    
}

