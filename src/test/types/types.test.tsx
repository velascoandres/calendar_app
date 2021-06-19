import { UITypes } from '../../types/ui.types'
import { CalendarTypes } from '../../types/calendar.types'
import { AuthTypes } from '../../types/auth.types'


describe('Pruebas en Types', () => {
    test('Los types [UI] deben ser iguales', () => {

        enum UITypesTest {

            uiOpenModal = '[UI] Open Modal',
            uiCloseModal = '[UI] Close Modal',
        }

        expect(UITypesTest).toEqual(UITypes)
    });

    test('Los types [Auth] deben ser iguales', () => {

        enum AuthTypesTest {

            authCheckingFinish = '[Auth] Finish checking login state',
            startLogin = '[Auth] Start login',
            login = '[Auth] login',

            startRegister = '[Auth] Start Register',
            startTokenRenew = '[Auth] Start token renew',
            logout = '[Auth] Logout',

        }

        expect(AuthTypesTest).toEqual(AuthTypes)
    });

    test('Los types [Calendar] deben ser iguales', () => {

        enum CalendarTypesTest {
            eventAddNew = '[Calendar] Add new Event',
            eventSetActive = '[Calendar] Set Active Event',
            eventClearActive = '[Calendar] Clear Active Event',
            eventUpdate = '[Calendar] Update Event',
            eventDelete = '[Calendar] Delete Event',
            eventStartAddNew = '[Calendar] Start Add new',
            eventLoaded = '[Calendar] Event loaded',
            eventLogout = '[Calendar] Logout'
        }


        expect(CalendarTypesTest).toEqual(CalendarTypes)
    });

})
