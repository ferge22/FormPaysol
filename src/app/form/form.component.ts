import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: [null],
      name: [null],
    });
  }

  submit(): void {
    this.subscriptions.add(
      this.contactService.send({ ...this.form.value }).subscribe(() => {})
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
