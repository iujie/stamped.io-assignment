
import * as actions from './actionType';

export function viewDetail(item, id) {
    return {
        type: actions.VIEW_DETAIL_TYPE,
        viewItem: item,
        viewId: id
    }
}

export function editProject(item, data) {
    return {
        type: actions.EDIT_PROJECT,
        viewItem: item,
        companyId: data.companyId
    }
}
