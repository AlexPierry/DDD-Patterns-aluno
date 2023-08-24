import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class LogMessageWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {

    handle(event: CustomerAddressChangedEvent): void {
        console.log('Endereço do cliente: %s, %s alterado para: %s',
            event.eventData.id,
            event.eventData.name,
            event.eventData.address);
    }

}