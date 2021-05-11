import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { oneOfControlRequired } from '../forms/validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly subscriptions = new Subscription();
  // tslint:disable-next-line: max-line-length
  // just created simplee component for aler, could have done like alert service but it would taken more time to impement, so its just simple solution for this task
  showAlert: boolean;
  alertMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group(
      {
        email: [null],
        name: [null],
      },
      { validators: oneOfControlRequired }
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.subscriptions.add(
      this.contactService.send({ ...this.form.value }).subscribe(() => {
        this.showAlert = true;
        this.alertMessage = 'Form submited!';
        this.form.reset();

        // hide alert after 1.5s
        setTimeout(() => {
          this.showAlert = false;
        }, 1500);
      })
    );
  }

  containsValidatorError(): boolean {
    return this.form.touched && this.form.hasError('atLeastOne');
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
