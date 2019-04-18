$ajax(
	objs.url,
	objs.elem,
	function(data) {
		if (data.code == 0) {
			var dataObj = data.data;				
			$(objs.elem).treeview({
				showCheckbox: true,
				onhoverColor: 'transparent',
				data: dataObj,
				icon: "",
				expandIcon: 'iconfont icon-pc-jia',
				collapseIcon: 'iconfont icon-pc-jian',
				emptyIcon: 'iconfont iconfont-no',
				nodeIcon: '',
				selectedIcon: '',
				checkedIcon: 'iconfont icon-check',
				uncheckedIcon: 'iconfont icon-uncheck',
				highlightSelected: false,
				levels: 3, //默认展开的级别
				expand: false,
				onNodeChecked: nodeChecked,
				onNodeUnchecked: nodeUnchecked,
				state: {
					expanded: false
				}
			});                
		} else {
			console.log('获取数据错误')
		}
	},
	true
);
var nodeCheckedSilent = false;
function nodeChecked(event, node) {
	if (nodeCheckedSilent) {
		return;
	}
	nodeCheckedSilent = true;
	checkAllParent(node);
	checkAllSon(node);
	nodeCheckedSilent = false;
}
var nodeUncheckedSilent = false;
function nodeUnchecked(event, node) {
	if (nodeUncheckedSilent)
		return;
	nodeUncheckedSilent = true;
	uncheckAllParent(node);
	uncheckAllSon(node);
	nodeUncheckedSilent = false;
}
//选中全部父节点
function checkAllParent(node) {
	$(objs.elem).treeview('checkParent', node.nodeId, { silent: true });
}
//取消全部父节点
function uncheckAllParent(node) {
	$('#searchTree').treeview('uncheckNode', node.nodeId, { silent: true });
	var siblings = $('#searchTree').treeview('getSiblings', node.nodeId);
	var parentNode = $('#searchTree').treeview('getParent', node.nodeId);
	if (!("nodeId" in parentNode)) {
		return;
	}
	var isAllUnchecked = true; //是否全部没选中
	for (var i in siblings) {
		if (siblings[i].state.checked) {
			isAllUnchecked = false;
			break;
		}
	}
	if (isAllUnchecked) {
		uncheckAllParent(parentNode);
	}
}
//级联选中所有子节点
function checkAllSon(node) {
	$(objs.elem).treeview('checkSon', node.nodeId, { silent: true });
}
//级联取消所有子节点
function uncheckAllSon(node) {
	$(objs.elem).treeview('unCheckSon', node.nodeId, { silent: true });
}



/* 使用方法 html中添加
*<div id="tree"></div>
*
*

})
*/
// 树的data格式
// var defaultData = [{
//         "id": 0,
//         "text": "计算机科学",
//         "nodes": [{
//                 "id": 1,
//                 "text": "软件工程",
//                 "nodes": [{
//                         "id": 2,
//                         "text": "图形学"
//                     },
//                     {
//                         "id": 3,
//                         "text": "大数据运算"
//                     }
//                 ]
//             },
//             {
//                 "id": 4,
//                 "text": "微机原理"
//             }
//         ]
//     },
//     {
//         "id": 5,
//         "text": "土木工程",
//         "state": {
//             "checked": true
//         }
//     },
//     {
//         "id": 6,
//         "text": "市场营销"
//     }
// ];
