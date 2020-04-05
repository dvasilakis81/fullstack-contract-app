export default function (state = {}, action) {

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
				searchContractsList: action.payload,
				contractDetailsSearchMode: action.payload ? action.payload[0] : null
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
		case 'DELETE_CONTRACT':

			let contracts = state.contractsList.filter((item) => {
				let found = false;
				item.Total = parseInt(item.Total) - 1;
				if (item.Id == action.payload.Id)
					found = true;

				if (!found)
					return item;
			});

			state = {
				...state,
				contractsList: contracts,
				contractDetails: contractsList ? contractsList[0] : null
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

					if (!found && item)
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
					if (item.Id == accountJustAdded[0].ContractId) {
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
		case 'UPDATE_ACCOUNT_PENDING':
			state = { ...state, updateAccountPending: 'Update account pending', updateAccountRejected: undefined, updatedAccount: undefined };
			break;
		case 'UPDATE_ACCOUNT_REJECTED':
			state = { ...state, accountPending: undefined, accountRejected: action.payload, updatedAccount: undefined };
			break;
		case 'UPDATE_ACCOUNT_FULFILLED':			
			if (state.contractsList) {
				let updatedContractsList = state.contractsList.map((item) => {

					var accountJustUpdated = action.payload.data;
					if (item.Id == accountJustUpdated[0].ContractId) {
						for (let i = 0; i < item.createdaccounts.length; i++) {
							if (item.createdaccounts[i].Number == accountJustUpdated[0].Number) {
								item.createdaccounts[i].Start = accountJustUpdated[0].Start
								item.createdaccounts[i].End = accountJustUpdated[0].End
								item.createdaccounts[i].AmountPure = accountJustUpdated[0].AmountPure
								item.createdaccounts[i].AmountFpa = accountJustUpdated[0].AmountFpa
								item.createdaccounts[i].AmountTotal = accountJustUpdated[0].AmountTotal
							}
						}
					}

					return item;
				})

				state = {
					...state,
					contractsList: updatedContractsList,
				};
			}

			if (state.searchContractsList) {
				let updatedContractsSearchList = state.searchContractsList.map((item) => {

					var accountJustUpdated = action.payload.data;
					if (item.Id == accountJustUpdated[0].ContractId) {
						for (let i = 0; i < item.createdaccounts.length; i++) {
							if (item.createdaccounts[i].Number == accountJustUpdated.Number) {
								item.createdaccounts[i].Start = accountJustUpdated[0].Start
								item.createdaccounts[i].End = accountJustUpdated[0].End
								item.createdaccounts[i].AmountPure = Number(accountJustUpdated[0].AmountPure)
								item.createdaccounts[i].AmountFpa = Number(accountJustUpdated[0].AmountFpa)
								item.createdaccounts[i].AmountTotal = Number(accountJustUpdated[0].AmountTotal)
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

			state = { ...state, updateAccountPending: undefined, updateAccountRejected: undefined, updateAccount: action.payload };
			break;
		default:
			break;
	}

	return state;
}