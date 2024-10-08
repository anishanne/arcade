import Link from "next/link";
import type { WithId } from "mongodb";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { getTextbooks } from "@/lib/serverActions";
import { useEffect, useState } from "react";
import { Textbook } from "@/types";

export default function ViewTextbooks({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
	const [textbooks, setTextbooks] = useState<WithId<Textbook>[]>([]);

	useEffect(() => {
		(async () => setTextbooks(await getTextbooks()))();
	}, []);

	return (
		<Dialog className="relative z-10" open={open} onClose={setOpen}>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
						<div>
							<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
								<DocumentTextIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
							</div>
							<div className="mt-3 text-center sm:mt-5">
								<DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-100">
									Created Textbooks
								</DialogTitle>
								<div className="mt-2">
									<p className="text-sm text-gray-400">
										{textbooks.length === 0 && "No Textbooks Found!"}
										{textbooks.map((textbook) => (
											<>
												{textbook.name} —{" "}
												<Link href={`/talk/${textbook._id}`} className="text-indigo-500 underline hover:no-underline">
													Launch
												</Link>{" "}
												<br />
											</>
										))}
									</p>
								</div>
							</div>
						</div>
						<div className="mt-5">
							<button
								type="button"
								className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-800 sm:col-start-1 sm:mt-0"
								onClick={() => setOpen(false)}
								data-autofocus>
								Close
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
