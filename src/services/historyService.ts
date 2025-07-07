
export interface HistoryRequest {
  id: string;
  shopName: string;
  customerName: string;
  requestTime: string;
  status: 'pending' | 'accepted' | 'declined';
  address: string;
}

class HistoryService {
  private customerHistory: HistoryRequest[] = [];
  private ownerHistory: HistoryRequest[] = [];

  addCustomerRequest(request: Omit<HistoryRequest, 'id'>) {
    const newRequest: HistoryRequest = {
      ...request,
      id: Date.now().toString()
    };
    this.customerHistory.push(newRequest);
    this.ownerHistory.push(newRequest);
    return newRequest;
  }

  updateRequestStatus(requestId: string, status: 'accepted' | 'declined') {
    // Update in customer history
    const customerIndex = this.customerHistory.findIndex(req => req.id === requestId);
    if (customerIndex !== -1) {
      this.customerHistory[customerIndex].status = status;
    }

    // Update in owner history
    const ownerIndex = this.ownerHistory.findIndex(req => req.id === requestId);
    if (ownerIndex !== -1) {
      this.ownerHistory[ownerIndex].status = status;
    }
  }

  getCustomerHistory(): HistoryRequest[] {
    return [...this.customerHistory];
  }

  getOwnerHistory(): HistoryRequest[] {
    return [...this.ownerHistory];
  }
}

export const historyService = new HistoryService();
