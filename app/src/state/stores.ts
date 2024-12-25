import {create} from 'zustand';
import {SystemData, getStatus} from '../helpers';
import {RequestStatuses} from '../components/RequestStatusIndicator';

interface DeviceState {
  names: string[] | undefined;
  status: SystemData | undefined;
  requestStatus: RequestStatuses;
  fetchStatus: () => Promise<void>;
  setRequestStatus: (value: RequestStatuses) => void;
  setDevicesNames: (value: string[]) => void;
  setDeviceName: (value: string, id: number) => void;
}

export const useStore = create<DeviceState>((set, get) => ({
  names: undefined,
  status: undefined,
  requestStatus: RequestStatuses.NO_DATA,
  setRequestStatus: value => set({requestStatus: value}),
  fetchStatus: async () => {
    const data = await getStatus();
    set({
      status: data,
    });
  },
  setDevicesNames: value => set({names: value}),
  setDeviceName: (value, id) => {
    const names = get().names;
    if (names) {
      names[id] = value;
      set({names: names});
    } else {
      throw new Error('Error getting devices names.');
    }
  },
}));
