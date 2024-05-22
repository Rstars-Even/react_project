// 账单列表相关store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: [],
    },
    reducers: {
        // 同步修改方法。
        setBillList (state, action) {
            state.billList = action.payload;
        }
    }
})

// 解构actionCreater函数
const { setBillList } = billStore.actions;
const getBillList= () => {
    // 编写异步请求
    return async(dispatch) => {
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}

export { getBillList };
// 导出 reducers
const reducer = billStore.reducer
export default reducer