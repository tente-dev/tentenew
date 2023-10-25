import { NonAcceptedFields } from 'modules/stores/hooks/requests'
import { LatLng } from 'react-native-maps'

export interface SelectLocationRouteParams {
  type: 'branch' | 'update'
  title: string
  initialCoordinates?: LatLng
  id?: number
  nonAcceptedFields?: NonAcceptedFields
}
