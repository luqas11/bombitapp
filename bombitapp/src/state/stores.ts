import {create} from 'zustand';
import {DeviceData, getStatus} from '../helpers';
import {RequestStatuses} from '../components/RequestStatusIndicator';

interface InputState {
  status: DeviceData | undefined;
  requestStatus: RequestStatuses;
  fetchStatus: () => Promise<void>;
  setRequestStatus: (value: RequestStatuses) => void;
}

export const useStore = create<InputState>(set => ({
  status: undefined,
  requestStatus: RequestStatuses.NO_DATA,
  setRequestStatus: value => set({requestStatus: value}),
  fetchStatus: async () => {
    const data = await getStatus();
    set({
      status: data,
    });
  },
}));
