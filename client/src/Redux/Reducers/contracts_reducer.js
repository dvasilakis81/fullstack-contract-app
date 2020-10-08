export default function (state = {}, action, root) {
	//console.log(action.type);	
	switch (action.type) {
		case 'RESET_ACTION':
			console.log('RESET_ACTION')
			state = {}
			break;
		case 'SEARCH_CONTRACTS_PENDING':
			state = {
				...state,
				searchContractsPending: 'Search Contracts pending',
				searchContractsRejected: undefined
			};
			break;
		case 'SEARCH_CONTRACTS_FULFILLED':
			state = {
				...state,
				searchContractsPending: undefined,
				searchContractsRejected: undefined,
				searchContractsList: action.payload.data,
				contractDetailsSearchMode: action.payload.data ? action.payload.data[0] : null
			};
			break;
		case 'SEARCH_CONTRACTS_REJECTED':
			state = {
				...state,
				searchContractsPending: undefined,
				searchContractsRejected: action.payload
			};
			break;
		case 'UPDATE_CONTRACT':
			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {

					if (item.Id === action.payload.Id) {
						return action.payload
					}
					else
						return item;
				});

				state = {
					...state,
					contractsList: updatedContractsList,
					contractDetails: action.payload
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					if (item.Id === action.payload.Id) {
						return action.payload
					}
					else
						return item;
				});

				state = {
					...state,
					searchContractsList: updatedContractsSearchList,
					contractDetailsSearchMode: action.payload
				};
			}
			break;
		case 'INSERT_CONTRACT':
			let contractsList = null;
			if (state.contractsList && state.contractsList.length > 0)
				contractsList = [action.payload, ...state.contractsList]
			else
				contractsList = action.payload

			state = {
				...state,
				contractsList: contractsList,
				contractDetails: action.payload
			};
			break;
		case 'SHOW_SNACKBAR':
			state = {
				...state,
				openMessage: action.payload.openMessage,
				message: action.payload.message,
				variant: action.payload.variant
			};
			break;
		case 'CLOSE_SNACKBAR':
			state = {
				...state,
				openMessage: false,
			};
			break;
		case 'DELETE_CONTRACT_PENDING':

			state = {
				...state,
				openMessage: false,
				deleteContractPending: true,
				deleteContractRejected: undefined,
				deletedContractFulfilled: undefined
			};
			break;
		case 'DELETE_CONTRACT_REJECTED':

			state = {
				...state,
				variant: 'error',
				openMessage: true,
				message: 'Αποτυχία διαγραφής της σύμβασης! ' + (action.payload ? action.payload.message : ''),
				deleteContractPending: undefined,
				deleteContractRejected: true,
				deletedContractFulfilled: undefined
			};
			break;
		case 'DELETE_CONTRACT_FULFILLED':

			let contracts = state.contractsList.filter((item) => {
				let found = false;
				item.Total = parseInt(item.Total) - 1;
				if (item.Id.toString() === action.payload.data.toString())
					found = true;

				if (found === false)
					return item;
			});

			state = {
				...state,
				variant: 'success',
				openMessage: true,
				message: 'Η διαγραφή της σύμβασης έγινε επιτυχώς!',
				deleteContractPending: undefined,
				deleteContractRejected: undefined,
				deletedContractFulfilled: action.payload,
				contractsList: contracts,
				contractDetails: contracts ? contracts[0] : null
			};
			break;
		case 'GET_CONTRACTS_PENDING':
			state = {
				...state,
				contractsPending: 'Contracts pending',
				contractsRejected: undefined
			};
			break;
		case 'CONTRACT_LOADED_ITEMS':
			state = {
				...state,
				loadedItems: action.payload
			};
			break;

		case 'GET_CONTRACTS_FULFILLED':
			if (action.payload.tokenIsValid !== undefined) {
				state = {
					...state,
					contractsPending: undefined,
					contractsRejected: undefined,
					contractsList: action.payload
				};
			} else {

				var selectedContract = state.contractDetails;
				let contracts = action.payload.filter((item) => {
					let found = false;
					if (state.contractsList) {
						for (let i = 0; i < state.contractsList.length; i++) {
							if (state.contractsList[i].Id === item.Id) {
								found = true;
								state.contractsList[i] = item;
								if (selectedContract && selectedContract.Id === item.Id)
									selectedContract = item;
								break;
							}
						}
					}

					if (found === false && item)
						return item;
				});

				let contractsList = contracts;
				if (state.contractsList && state.contractsList.length > 0)
					contractsList = [...state.contractsList, ...contracts]

				state = {
					...state,
					contractsPending: undefined,
					contractsRejected: undefined,
					contractsList: contractsList,
					contractDetails: contractsList ? selectedContract : null
				};
			}
			break;
		case 'GET_CONTRACTS_REJECTED':
			state = {
				...state,
				contractsPending: undefined,
				contractsRejected: action.payload
			};
			break;
		case 'SET_CONTRACT_DETAIL':
			state = {
				...state,
				contractDetails: action.payload
			};
			break;
		case 'IS_CONTRACTS_SEARCH_MODE':
			state = {
				...state,
				isSearchMode: action.payload
			};
			break;
		case 'SEARCH_MODE_CONTRACT_DETAIL':
			state = {
				...state,
				contractDetailsSearchMode: action.payload
			};
			break;
		case 'SEARCH_MODE_VALUE':
			state = {
				...state,
				searchModeValue: action.payload
			};
			break;
		case 'INSERT_ACCOUNT_PENDING':
			state = { ...state, createAccountPending: 'Create account pending', createAccountRejected: undefined, createdAccount: undefined };
			break;
		case 'INSERT_ACCOUNT_REJECTED':
			state = { ...state, accountPending: undefined, accountRejected: action.payload, createdAccount: undefined };
			break;
		case 'INSERT_ACCOUNT_FULFILLED':
			//add color to the button that indicates the account has been created
			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {

					var accountJustAdded = action.payload.data;
					if (item.Id.toString() === accountJustAdded[0].ContractId.toString()) {
						if (item.createdaccounts === undefined || item.createdaccounts === null)
							item.createdaccounts = [];
						item.createdaccounts.push({
							'Number': accountJustAdded[0].Number,
							'Start': accountJustAdded[0].Start,
							'End': accountJustAdded[0].End,
							'AmountPure': accountJustAdded[0].AmountPure,
							'AmountFpa': accountJustAdded[0].AmountFpa,
							'AmountTotal': accountJustAdded[0].AmountTotal,
						});
					}

					return item;
				});

				state = {
					...state,
					contractsList: updatedContractsList,
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					var accountJustAdded = action.payload.data;
					if (item.Id === accountJustAdded[0].ContractId) {
						if (item.createdaccounts === undefined || item.createdaccounts === null)
							item.createdaccounts = [];
						item.createdaccounts.push({
							'Number': accountJustAdded[0].Number,
							'Start': accountJustAdded[0].Start,
							'End': accountJustAdded[0].End,
							'AmountPure': accountJustAdded[0].AmountPure,
							'AmountFpa': accountJustAdded[0].AmountFpa,
							'AmountTotal': accountJustAdded[0].AmountTotal,
						});
					}

					return item;
				});

				state = {
					...state,
					searchContractsList: updatedContractsSearchList,
					contractDetailsSearchMode: action.payload
				};
			}

			state = { ...state, createAccountPending: undefined, createAccountRejected: undefined, createdAccount: action.payload };
			break;		
		case 'UPDATE_ACCOUNT_FULFILLED':
			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {

					var accountJustUpdated = action.payload.data;
					if (item.Id.toString() === accountJustUpdated.ContractId.toString()) {
						for (let i = 0; i < item.createdaccounts.length; i++) {
							if (item.createdaccounts[i].Number.toString() === accountJustUpdated.Number.toString()) {
								item.createdaccounts[i].Start = accountJustUpdated.Start
								item.createdaccounts[i].End = accountJustUpdated.End
								item.createdaccounts[i].AmountPure = accountJustUpdated.AmountPure
								item.createdaccounts[i].AmountFpa = accountJustUpdated.AmountFpa
								item.createdaccounts[i].AmountTotal = accountJustUpdated.AmountTotal
							}
						}
					}

					return item;
				})

				state = {
					...state,
					contractsList: updatedContractsList
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					var accountJustUpdated = action.payload.data;
					if (item.Id.toString() === accountJustUpdated.ContractId.toString()) {
						for (let i = 0; i < item.createdaccounts.length; i++) {
							if (item.createdaccounts[i].Number.toString() === accountJustUpdated.Number.toString()) {
								item.createdaccounts[i].Start = accountJustUpdated.Start
								item.createdaccounts[i].End = accountJustUpdated.End
								item.createdaccounts[i].AmountPure = Number(accountJustUpdated.AmountPure)
								item.createdaccounts[i].AmountFpa = Number(accountJustUpdated.AmountFpa)
								item.createdaccounts[i].AmountTotal = Number(accountJustUpdated.AmountTotal)
							}
						}
					}

					return item;
				});

				state = {
					...state,
					searchContractsList: updatedContractsSearchList,
					contractDetailsSearchMode: action.payload
				};
			}
			break;
		case 'INSERT_CONTRACTINFO_PENDING':
			state = {
				...state,
				insertContractInfoPending: true,
				insertContractInfoRejected: false
			};
			break;
		case 'INSERT_CONTRACTINFO_REJECTED':
			state = {
				...state,
				insertContractInfoPending: false,
				insertContractInfoRejected: action.payload
			};
			break;
		case 'INSERT_CONTRACTINFO_FULFILLED':
			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {
					console.log('ContractId:' + action.payload.data.Id)
					var contractItem = action.payload.data;
					if (item.Id.toString() === contractItem.Id.toString())
						item = contractItem

					return item;
				});

				state = {
					...state,
					insertContractInfoPending: false,
					insertContractInfoRejected: false,
					contractsList: updatedContractsList,
					contractDetails: action.payload.data
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					var contractItem = action.payload.data;
					if (item.Id.toString() === contractItem[0].Id.toString())
						item = contractItem[0]

					return item;
				});

				state = {
					...state,
					insertContractInfoPending: false,
					insertContractInfoRejected: false,
					searchContractsList: updatedContractsSearchList,
					contractDetailsSearchMode: action.payload
				};
			}

			break;
		case 'UPDATE_CONTRACTINFO_PENDING':

			state = {
				...state,
				updateDecicionBoardPending: true,
				updateDecicionBoardRejected: false
			};
			break;
		case 'UPDATE_CONTRACTINFO_REJECTED':
			state = {
				...state,
				updateDecicionBoardPending: false,
				updateDecicionBoardRejected: action.payload
			};
			break;
		case 'UPDATE_CONTRACTINFO_FULFILLED':

			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {

					var contractItem = action.payload.data;
					if (item.Id.toString() === contractItem.Id.toString())
						item = contractItem

					return item;
				});

				state = {
					...state,
					contractsList: updatedContractsList,
					contractDetails: action.payload.data
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					var contractItem = action.payload.data;
					if (item.Id.toString() === contractItem.Id.toString())
						item = contractItem

					return item;
				});

				state = {
					...state,
					updateDecicionBoardPending: false,
					updateDecicionBoardRejected: false,
					searchContractsList: updatedContractsSearchList,
					contractDetailsSearchMode: action.payload.data
				};
			}

			break;
		case 'DELETE_CONTRACTINFO_PENDING':
			state = {
				...state,
				deleteContractInfoPending: true,
				deleteContractInfoRejected: false
			};
			break;
		case 'DELETE_CONTRACTINFO_REJECTED':
			state = {
				...state,
				deleteContractInfoPending: false,
				deleteContractInfoRejected: action.payload
			};
			break;
		case 'DELETE_CONTRACTINFO_FULFILLED':

			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {

					var contractItem = action.payload.data;
					if (item.Id.toString() === contractItem.Id.toString())
						item = contractItem

					return item;
				});

				state = {
					...state,
					deleteContractInfoPending: false,
					deleteContractInfoRejected: false,
					contractsList: updatedContractsList,
					contractDetails: action.payload.data
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					var contractItem = action.payload.data;
					if (item.Id.toString() === contractItem[0].Id.toString())
						item = contractItem[0]

					return item;
				});

				state = {
					...state,
					deleteContractInfoPending: false,
					deleteContractInfoRejected: false,
					searchContractsList: updatedContractsSearchList,
					contractDetailsSearchMode: action.payload
				};
			}

			break;
		case 'SET_CONTRACTINFO_PENDING':
			state = {
				...state,
				deleteContractInfoPending: false,
				deleteContractInfoRejected: false,
				insertContractInfoPending: false,
				insertContractInfoRejected: false,
				updateDecicionBoardPending: false,
				updateDecicionBoardRejected: false
			};
			break;
		default:
			break;
	}

	return state;
}