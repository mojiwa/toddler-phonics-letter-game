import React from 'react';

interface IModalProps {
  ShowModal: boolean;
  ModalTitle: string;
  ModalText: string;
  ModalCancelText: string;
  ModalConfirmText: string;
  ModalOnCancel: Function;
  ModalOnConfirm: Function;
  ModalNeedsCancel: boolean;
}

interface IModalState {

}

export default class Modal extends React.PureComponent<IModalProps, IModalState> {
  readonly state = {

  }

  render() {
    return (
      <div className={`${this.props.ShowModal ? '' : 'hidden'}`}>
        <div className="z-10 fixed sm:bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 flex sm:items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full border-purple-700 border-solid border-4 bg-yellow-500" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start ml-5">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-bold text-purple-700" id="modal-headline">
                    {this.props.ModalTitle}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-800">
                    {this.props.ModalText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button 
                  type="button" 
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-purple-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-purple-600 focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => this.props.ModalOnConfirm()}>
                  {this.props.ModalConfirmText}
                </button>
              </span>
              <span className={`mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto ${this.props.ModalNeedsCancel ? '' : 'hidden'}`}>
                <button 
                  type="button" 
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-purple-500 text-base text-white leading-6 font-medium shadow-sm hover:bg-purple-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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