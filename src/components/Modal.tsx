import React from 'react';

interface IModalProps {
  ShowModal: boolean;
  ModalTitle: string;
  ModalText: string;
  ModalCancelText: string;
  ModalConfirmText: string;
  ModalOnCancel: Function;
  ModalOnConfirm: Function;
}

interface IModalState {

}

export default class Modal extends React.PureComponent<IModalProps, IModalState> {
  readonly state = {

  }

  render() {
    return (
      <div className={`${this.props.ShowModal ? '' : 'hidden'}`}>
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start ml-5">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    {this.props.ModalTitle}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-500">
                    {this.props.ModalText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button 
                  type="button" 
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => this.props.ModalOnConfirm()}>
                  {this.props.ModalConfirmText}
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button 
                  type="button" 
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => this.props.ModalOnCancel()}>
                  {this.props.ModalCancelText}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}