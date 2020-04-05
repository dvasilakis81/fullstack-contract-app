export default function (state = {}, action) {

  switch (action.type) {

    case 'RESET_ACTION':
      state = {}
      break;
    case 'DO_REFRESH':
      state = { ...state, doRefresh: action.payload }
      break;
    case 'SCREEN_DIMENSIONS':      
      state = { ...state, screenDimensions: action.payload }
      break;
    case 'GET_MUN_DIRECTIONS':
      state = { ...state, municipalityDirections: action.payload.data };

      let ccPossibleValues = state.ccValues ? state.ccValues : [];
      let directionValue = ''
      for (let index = 0; index < action.payload.data.length; index++) {
        const direction = action.payload.data[index];
        directionValue = 'Διεύθυνση ' + direction.DirectionName
        let departmentValue = '';
        if (direction.department && direction.department.length > 0) {
          for (let index = 0; index < direction.department.length; index++) {
            departmentValue = direction.department[index].DepartmentName.includes("Τμήμα") === true ? ' - ' + direction.department[index].DepartmentName : ' - Τμήμα ' + direction.department[index].DepartmentName
            ccPossibleValues.push(directionValue + '' + departmentValue)
          }
        }
        else
          ccPossibleValues.push(directionValue)
      }
      //ccPossibleValues.push(directionValue)
      state = { ...state, ccValues: ccPossibleValues };      
      break;
    case 'GET_CONTRACT_TYPES':
      state = { ...state, contractTypes: action.payload.data };
      break;
    case 'GET_RESERVATIONS':
      state = { ...state, reservations: action.payload.data };
      break;
    case 'GET_MUN_AGENCIES':
      let agencyValue = ''
      let tempList = state.ccValues ? state.ccValues : [];

      for (let agencyIndex = 0; agencyIndex < action.payload.data.length; agencyIndex++) {
        agencyValue = action.payload.data[agencyIndex].Name;
         tempList.push(agencyValue);
      }

      state = {
        ...state,
        agencies: action.payload.data,
        ccValues: tempList
      };

      break;
    case 'GET_SIGNATORIES':
      state = { ...state, signatories: action.payload.data };
      break;
    case 'GET_SIGNATORYTYPES':
      state = { ...state, signatorytypes: action.payload.data };
      break;
    case 'GET_ERRORMESSAGES':
      state = { ...state, errormessages: action.payload.data };
      break;
    case 'GET_USERS':
      state = { ...state, users: action.payload.data };
      break;
    case 'SELECTED_TABLE_ITEM':
      state = { ...state, selectedTableItem: action.payload };
      break;
    case 'GET_USER_ROLES':
      state = { ...state, userroles: action.payload };
      break;
    case 'CREATE_USER':
      let users = null;
      if (state.users && state.users.length > 0)
        users = [action.payload, ...state.users]
      else
        users = action.payload

      state = {
        ...state,
        users: users
      };
      break;
    case 'UPDATE_USER':
      if (state.users) {
        let updatedUsers = state.users.map((item) => {

          if (item.Id === action.payload.Id) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          users: updatedUsers
        };
      }
      break;
    case 'DELETE_USER':
      if (state.users) {
        let users = state.users.filter((item) => {

          if (item.Id !== action.payload.Id)
            return item;
        });

        state = {
          ...state,
          users: users
        };
      }
      break;
    case 'CREATE_CONTRACT_TYPE':
      let contractTypes = null;
      if (state.contractTypes && state.contractTypes.length > 0)
        contractTypes = [action.payload, ...state.contractTypes]
      else
        contractTypes = action.payload

      state = {
        ...state,
        contractTypes: contractTypes
      };
      break;
    case 'UPDATE_CONTRACT_TYPE':
      if (state.contractTypes) {
        let updatedContractTypes = state.contractTypes.map((item) => {

          if (item.ContractTypeId === action.payload.ContractTypeId) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          contractTypes: updatedContractTypes
        };
      }
      break;
    case 'DELETE_CONTRACT_TYPE':
      if (state.contractTypes) {
        let contractTypes = state.contractTypes.filter((item) => {

          if (item.ContractTypeId !== action.payload.ContractTypeId)
            return item;
        });

        state = {
          ...state,
          contractTypes: contractTypes
        };
      }
      break;
    case 'CREATE_AGENCY':
      let agencies = null;
      if (state.agencies && state.agencies.length > 0)
        agencies = [action.payload, ...state.agencies]
      else
        agencies = action.payload

      state = {
        ...state,
        agencies: agencies
      };
      break;
    case 'UPDATE_AGENCY':
      if (state.agencies) {
        let agencies = state.agencies.map((item) => {

          if (item.Id === action.payload.Id) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          agencies: agencies
        };
      }
      break;
    case 'DELETE_AGENCY':
      if (state.agencies) {
        let agencies = state.agencies.filter((item) => {

          if (item.Id !== action.payload.Id)
            return item;
        });

        state = {
          ...state,
          agencies: agencies
        };
      }
      break;
    case 'CREATE_DIRECTION':
      let municipalityDirections = null;

      if (state.municipalityDirections && state.municipalityDirections.length > 0)
        municipalityDirections = [action.payload, ...state.municipalityDirections]
      else
        municipalityDirections = action.payload

      state = {
        ...state,
        municipalityDirections: municipalityDirections
      };
      break;
    case 'UPDATE_DIRECTION':
      if (state.municipalityDirections) {
        let municipalityDirections = state.municipalityDirections.map((item) => {

          if (item.DirectionId === action.payload.DirectionId) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          municipalityDirections: municipalityDirections
        };
      }
      break;
    case 'DELETE_DIRECTION':
      if (state.municipalityDirections) {
        let municipalityDirections = state.municipalityDirections.filter((item) => {

          if (item.DirectionId !== action.payload.DirectionId)
            return item;
        });

        state = {
          ...state,
          municipalityDirections: municipalityDirections
        };
      }
      break;
    case 'CREATE_DEPARTMENT':
      if (state.municipalityDirections) {
        var isAdded = false;
        let municipalityDirections = state.municipalityDirections.map((item) => {

          if (!isAdded && item.DirectionId === action.payload.DirectionId) {
            isAdded = true;

            if (!item.department)
              item.department = [];

            if (item.department)
              item.department.push(action.payload)

            return item;
          }
          else
            return item;
        });

        state = {
          ...state,
          municipalityDirections: municipalityDirections
        };
      }
      break;
    case 'UPDATE_DEPARTMENT':
      if (state.municipalityDirections) {

        let municipalityDirections = state.municipalityDirections.map((item) => {
          if (item.DirectionId === action.payload.DirectionId) {
            item.department = item.department.map((item) => {
              if (item.DepartmentId === action.payload.DepartmentId)
                return action.payload;
              else
                return item;
            })
          }
          return item;
        })

        state = {
          ...state,
          municipalityDirections: municipalityDirections
        };
      }
      break;
    case 'DELETE_DEPARTMENT':
      if (state.municipalityDirections) {

        let municipalityDirections = state.municipalityDirections.map((item) => {
          if (item.DirectionId === action.payload.DirectionId) {
            item.department = item.department.filter((item) => {
              if (item.DepartmentId !== action.payload.DepartmentId)
                return item;
            })
          }
          return item;
        })

        state = {
          ...state,
          municipalityDirections: municipalityDirections
        };
      }
      break;
    case 'CREATE_RESERVATION':
      let reservations = null;

      if (state.reservations && state.reservations.length > 0)
        reservations = [action.payload, ...state.reservations]
      else
        reservations = action.payload

      state = {
        ...state,
        reservations: reservations
      };
      break;
    case 'UPDATE_RESERVATION':
      if (state.reservations) {
        let reservations = state.reservations.map((item) => {

          if (item.Id === action.payload.Id) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          reservations: reservations
        };
      }
      break;
    case 'DELETE_RESERVATION':
      if (state.reservations) {
        let reservations = state.reservations.filter((item) => {

          if (item.Id !== action.payload.Id)
            return item;
        });

        state = {
          ...state,
          reservations: reservations
        };
      }
      break;
    case 'CREATE_SIGNATORY':
      let signatories = null;

      if (state.signatories && state.signatories.length > 0)
        signatories = [action.payload, ...state.signatories]
      else
        signatories = action.payload

      state = {
        ...state,
        signatories: signatories
      };
      break;
    case 'UPDATE_SIGNATORY':
      if (state.signatories) {
        let signatories = state.signatories.map((item) => {

          if (item.Id === action.payload.Id) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          signatories: signatories
        };
      }
      break;
    case 'DELETE_SIGNATORY':
      if (state.signatories) {
        let signatories = state.signatories.filter((item) => {

          if (item.Id !== action.payload.Id)
            return item;
        });

        state = {
          ...state,
          signatories: signatories
        };
      }
      break;
    case 'CREATE_SIGNATORY_TYPE':
      let signatorytypes = null;

      if (state.signatorytypes && state.signatorytypes.length > 0)
        signatorytypes = [action.payload, ...state.signatorytypes]
      else
        signatorytypes = action.payload

      state = {
        ...state,
        signatorytypes: signatorytypes
      };
      break;
    case 'UPDATE_SIGNATORY_TYPE':
      if (state.signatorytypes) {
        let signatorytypes = state.signatorytypes.map((item) => {

          if (item.Id === action.payload.Id) {
            return action.payload
          }
          else
            return item;
        });

        state = {
          ...state,
          signatorytypes: signatorytypes
        };
      }
      break;
    case 'DELETE_SIGNATORY_TYPE':
      if (state.signatories) {
        let signatorytypes = state.signatorytypes.filter((item) => {

          if (item.Id !== action.payload.Id)
            return item;
        });

        state = {
          ...state,
          signatorytypes: signatorytypes
        };
      }
      break;
    case 'DELETE_ERROR_MESSAGE':
      if (state.errormessages) {
        let errormessages = state.errormessages.filter((item) => {

          if (item.Id !== action.payload.Id)
            return item;
        });

        state = {
          ...state,
          errormessages: errormessages
        };
      }
      break;
    default:
      break;
  }

  return state;
}